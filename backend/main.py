from decimal import Decimal, ROUND_DOWN
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="TradeOS API", version="0.1.0")

origins = [
    os.getenv("FRONTEND_URL", "http://localhost:3000")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class PositionSizeRequest(BaseModel):
    total_equity: Decimal = Field(..., gt=0)
    entry_price: Decimal = Field(..., gt=0)
    stop_loss_price: Decimal = Field(..., gt=0)
    rote_percent: Decimal = Field(..., gt=0)


class PositionSizeResponse(BaseModel):
    risk_amount: Decimal
    share_count: int
    risk_per_share: Decimal


@app.get("/health")
def healthcheck():
    return {"status": "ok"}


@app.post("/api/position-size", response_model=PositionSizeResponse)
def calculate_position_size(payload: PositionSizeRequest):
    if payload.entry_price <= payload.stop_loss_price:
        raise HTTPException(status_code=400, detail="Stop loss must be below entry price.")

    rote_fraction = payload.rote_percent / Decimal("100")
    risk_amount = (payload.total_equity * rote_fraction).quantize(
        Decimal("0.01"), rounding=ROUND_DOWN
    )
    risk_per_share = payload.entry_price - payload.stop_loss_price
    share_count = int((risk_amount / risk_per_share).to_integral_value(rounding=ROUND_DOWN))

    return PositionSizeResponse(
        risk_amount=risk_amount,
        share_count=share_count,
        risk_per_share=risk_per_share.quantize(Decimal("0.01"), rounding=ROUND_DOWN)
    )
