import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Stripe from "stripe";
import { PlanType, Subscription, SubscriptionStatus } from "../entities/subscription.entity";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { CreateCheckoutDto } from "../dto";

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(
  this.configService.get<string>("STRIPE_SECRET_KEY") || "",
  { apiVersion: "2022-11-15" },
);
  }

  async createCheckoutSession(
    dto: CreateCheckoutDto,
    userId: string,
  ): Promise<{ url: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const stripeCustomerId = await this.getOrCreateStripeCustomer(user);
    const priceId = this.getPriceId(dto.plan);

    const session = await this.stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:3000/payments/success",
      cancel_url: "http://localhost:3000/payments/cancel",
      metadata: {
        userId,
        plan: dto.plan,
      },
    });

    return {
      url: session.url || "",
    };
  }

  private getPriceId(plan: PlanType): string {
    const prices = {
      [PlanType.FREE]:
        this.configService.get<string>("STRIPE_FREE_PRICE_ID") || "",
      [PlanType.PRO]:
        this.configService.get<string>("STRIPE_PRO_PRICE_ID") || "",
      [PlanType.ENTERPRISE]:
        this.configService.get<string>("STRIPE_ENTERPRISE_PRICE_ID") || "",
    };

    return prices[plan];
  }

  private async getOrCreateStripeCustomer(user: User): Promise<string> {
    const existing = await this.subscriptionRepository.findOne({
      where: { userId: user.id },
    });

    if (existing?.stripeCustomerId) {
      return existing.stripeCustomerId;
    }

    const customer = await this.stripe.customers.create({
      email: user.email,
      name: user.name,
      metadata: {
        userId: user.id,
      },
    });

    return customer.id;
  }

  async handleWebhook(
    payload: Buffer,
    signature: string,
  ): Promise<void> {
    const webhookSecret =
      this.configService.get<string>("STRIPE_WEBHOOK_SECRET") || "";

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } catch {
      throw new Error("Invalid webhook signature");
    }

    switch (event.type) {
      case "checkout.session.completed":
        await this.handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      case "customer.subscription.deleted":
        await this.handleSubscriptionCancelled(
          event.data.object as Stripe.Subscription,
        );
        break;

      case "invoice.payment_failed":
        await this.handlePaymentFailed(
          event.data.object as Stripe.Invoice,
        );
        break;
    }
  }

  async getUserSubscription(
    userId: string,
  ): Promise<Subscription | null> {
    return this.subscriptionRepository.findOne({
      where: { userId },
    });
  }

  private async handleCheckoutCompleted(
    session: Stripe.Checkout.Session,
  ): Promise<void> {
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan as PlanType;

    const existing = await this.subscriptionRepository.findOne({
      where: { userId },
    });

    if (existing) {
      existing.plan = plan;
      existing.status = SubscriptionStatus.ACTIVE;
      existing.stripeCustomerId = session.customer as string;
      existing.stripeSubscriptionId = session.subscription as string;

      await this.subscriptionRepository.save(existing);
    } else {
      const subscription = this.subscriptionRepository.create({
        userId,
        plan,
        status: SubscriptionStatus.ACTIVE,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: session.subscription as string,
      });

      await this.subscriptionRepository.save(subscription);
    }
  }

  private async handleSubscriptionCancelled(
    stripeSubscription: Stripe.Subscription,
  ): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        stripeSubscriptionId: stripeSubscription.id,
      },
    });

    if (subscription) {
      subscription.status = SubscriptionStatus.CANCELLED;
      subscription.plan = PlanType.FREE;

      await this.subscriptionRepository.save(subscription);
    }
  }

  private async handlePaymentFailed(
    invoice: Stripe.Invoice,
  ): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        stripeCustomerId: invoice.customer as string,
      },
    });

    if (subscription) {
      subscription.status = SubscriptionStatus.PAST_DUE;

      await this.subscriptionRepository.save(subscription);
    }
  }
}