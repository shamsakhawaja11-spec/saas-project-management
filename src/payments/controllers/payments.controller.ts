import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Headers,
  RawBodyRequest,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { Request } from "express";
import { PaymentsService } from "../services/payments.service";
import { CreateCheckoutDto } from "../dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // POST /payments/checkout
  // Protected - user must be logged in
  // Creates a Stripe checkout session and returns the URL
  // Frontend redirects user to this URL to complete payment
  @UseGuards(JwtAuthGuard)
  @Post("checkout")
  async createCheckoutSession(
    @Body() dto: CreateCheckoutDto,
    @Req() req: Request,
  ): Promise<{ url: string }> {
    const userId = (req.user as { userId: string }).userId;
    return this.paymentsService.createCheckoutSession(dto, userId);
  }

  // POST /payments/webhook
  // NOT protected - Stripe calls this directly from their servers
  // HttpCode 200 because Stripe expects 200, not 201
  // RawBodyRequest is critical - Stripe signature verification needs raw bytes
  // If you parse the body as JSON first, signature verification will fail
  @Post("webhook")
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers("stripe-signature") signature: string,
  ): Promise<void> {
    const payload = req.rawBody as Buffer;
    return this.paymentsService.handleWebhook(payload, signature);
  }

  // GET /payments/subscription
  // Protected - get current user's subscription status
  @UseGuards(JwtAuthGuard)
  @Get("subscription")
  async getUserSubscription(@Req() req: Request) {
    const userId = (req.user as { userId: string }).userId;
    return this.paymentsService.getUserSubscription(userId);
  }
}