import ApiError from "../../utils/ApiError.js";

class PaymentStrategy {
  // Different payment methods can process the same bill in different ways.
  processPayment() {
    throw new Error("processPayment must be implemented by subclasses");
  }
}

export class CashPaymentStrategy extends PaymentStrategy {
  processPayment(amount) {
    return {
      paymentMethod: "cash",
      amountPaid: amount,
      paymentStatus: "paid"
    };
  }
}

export class CardPaymentStrategy extends PaymentStrategy {
  processPayment(amount) {
    return {
      paymentMethod: "card",
      amountPaid: amount,
      paymentStatus: "paid"
    };
  }
}

export class InsurancePaymentStrategy extends PaymentStrategy {
  processPayment(amount) {
    return {
      paymentMethod: "insurance",
      amountPaid: amount,
      // Insurance often needs approval, so this example keeps it pending.
      paymentStatus: "pending-insurance-approval"
    };
  }
}

export const paymentStrategyFactory = (method) => {
  // Factory pattern: choose the correct behavior based on the selected method.
  switch (method) {
    case "cash":
      return new CashPaymentStrategy();
    case "card":
      return new CardPaymentStrategy();
    case "insurance":
      return new InsurancePaymentStrategy();
    default:
      throw new ApiError(400, "Unsupported payment method");
  }
};
