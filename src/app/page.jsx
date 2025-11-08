"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Toaster, toast } from "react-hot-toast";
import { Heart, DollarSign, Check } from "lucide-react";

export default function Home() {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Preset donation amounts
  const presetAmounts = [5, 10, 25, 50, 100, 250];

  const handleAmountPress = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    const cleaned = value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const parts = cleaned.split(".");
    if (parts.length > 2) return;

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) return;

    setCustomAmount(cleaned);
    setSelectedAmount(null);
  };

  const handleDonate = async () => {
    const amount = selectedAmount || parseFloat(customAmount);

    // Validation
    if (!amount || amount <= 0) {
      toast.error("Please enter or select a valid donation amount");
      return;
    }

    if (amount < 1) {
      toast.error("The minimum donation amount is $1");
      return;
    }

    if (amount > 10000) {
      toast.error("The maximum donation amount is $10,000");
      return;
    }

    try {
      setProcessing(true);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://evvntly.com/api";
      const response = await fetch(`${apiUrl}/create-donation-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create donation session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Donation error:", error);
      toast.error(error.message || "Failed to process donation. Please try again.");
      setProcessing(false);
    }
  };

  const currentAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  return (
    <>
      <Toaster position="top-center" />
      <Container>
        <BackgroundOrbs>
          <Orb color="#FCC920" top="10%" left="5%" size="500px" delay={0} />
          <Orb color="#4ECDC4" top="60%" left="80%" size="450px" delay={1} />
          <Orb color="#FFD93D" top="75%" left="10%" size="400px" delay={2} />
          <Orb color="#9b59b6" top="40%" left="90%" size="350px" delay={1.5} />
        </BackgroundOrbs>

        <DonateContainer>
          <LogoContainer>
            <Logo src="https://evvntly.com/images/white.png" alt="Evvntly" />
          </LogoContainer>

          <Header>
            <HeartIconContainer>
              <Heart size={48} color="#FCC920" fill="#FCC920" />
            </HeartIconContainer>
            <Title>Support Evvntly</Title>
            <Subtitle>
              Help us keep the events flowing and the community growing
            </Subtitle>
          </Header>

          <DonationSection>
            <SectionTitle>Choose an Amount</SectionTitle>

            <PresetAmountsGrid>
              {presetAmounts.map((amount) => (
                <PresetAmountButton
                  key={amount}
                  selected={selectedAmount === amount}
                  onClick={() => handleAmountPress(amount)}
                  disabled={processing}
                >
                  <DollarSign size={20} />
                  <PresetAmountText>{amount}</PresetAmountText>
                  {selectedAmount === amount && (
                    <CheckIcon>
                      <Check size={18} />
                    </CheckIcon>
                  )}
                </PresetAmountButton>
              ))}
            </PresetAmountsGrid>

            <DividerContainer>
              <Divider />
              <DividerText>or</DividerText>
              <Divider />
            </DividerContainer>

            <CustomAmountContainer>
              <CustomAmountLabel>Enter Custom Amount</CustomAmountLabel>
              <CustomAmountInputContainer>
                <DollarSignIcon>
                  <DollarSign size={24} />
                </DollarSignIcon>
                <CustomAmountInput
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="0.00"
                  disabled={processing}
                  maxLength={8}
                />
              </CustomAmountInputContainer>
              <CustomAmountHint>Enter any amount from $1 to $10,000</CustomAmountHint>
            </CustomAmountContainer>

            <DonateButton
              onClick={handleDonate}
              disabled={processing || currentAmount <= 0}
            >
              {processing ? (
                <Spinner />
              ) : currentAmount > 0 ? (
                `Donate $${currentAmount.toFixed(2)}`
              ) : (
                "Select an Amount"
              )}
            </DonateButton>
          </DonationSection>

          <SecurityNote>
            🔒 All donations are processed securely through Stripe. We never see or store your payment information.
          </SecurityNote>

          <ThankYouNote>
            ❤️ Thank you for supporting Evvntly! Every donation, no matter the size, makes a huge difference.
          </ThankYouNote>
        </DonateContainer>
      </Container>
    </>
  );
}

const orbFloat = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.15);
  }
  66% {
    transform: translate(-40px, 30px) scale(0.85);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%);
  overflow: hidden;
  padding: 20px;
`;

const BackgroundOrbs = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

const Orb = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background: ${props => props.color};
  filter: blur(60px);
  opacity: 0.3;
  animation: ${orbFloat} ${props => 15 + props.delay * 5}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const DonateContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 50px 40px;

  @media (max-width: 768px) {
    padding: 40px 30px;
    max-width: 100%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

const Logo = styled.img`
  height: 60px;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));

  @media (max-width: 768px) {
    height: 45px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const HeartIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 18px;
  line-height: 1.5;
  max-width: 480px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const InfoBox = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid #FCC920;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
`;

const InfoHeader = styled.h3`
  color: #FCC920;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  text-align: center;
`;

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin-bottom: 12px;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoListItem = styled.li`
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  line-height: 1.8;
  padding-left: 4px;
`;

const DonationSection = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const PresetAmountsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PresetAmountButton = styled.button`
  position: relative;
  background: ${props => props.selected
    ? 'linear-gradient(135deg, #FCC920 0%, #FDD74F 100%)'
    : 'rgba(255, 255, 255, 0.08)'};
  border: 2px solid ${props => props.selected ? '#FCC920' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 12px;
  padding: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${props => props.selected ? '#333' : 'rgba(255, 255, 255, 0.9)'};
  font-size: 20px;
  font-weight: 600;
  opacity: ${props => props.disabled ? 0.6 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    background: ${props => props.selected
      ? 'linear-gradient(135deg, #FCC920 0%, #FDD74F 100%)'
      : 'rgba(255, 255, 255, 0.12)'};
    border-color: ${props => props.selected ? '#FCC920' : 'rgba(255, 255, 255, 0.3)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const PresetAmountText = styled.span`
  font-size: 22px;
  font-weight: 700;
`;

const CheckIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 32px 0;
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
`;

const DividerText = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CustomAmountContainer = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

const CustomAmountLabel = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const CustomAmountInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #FCC920;
    box-shadow: 0 0 0 3px rgba(252, 201, 32, 0.1);
  }
`;

const DollarSignIcon = styled.div`
  color: rgba(255, 255, 255, 0.7);
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const CustomAmountInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  padding: 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const CustomAmountHint = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin-top: 8px;
`;

const DonateButton = styled.button`
  width: 100%;
  background: ${props => props.disabled
    ? 'rgba(255, 255, 255, 0.1)'
    : 'linear-gradient(135deg, #FCC920 0%, #FDD74F 100%)'};
  color: #333333;
  border: none;
  border-radius: 12px;
  padding: 18px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: 0 10px 30px rgba(252, 201, 32, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const SecurityNote = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
`;

const ThankYouNote = styled.p`
  color: #FCC920;
  font-size: 15px;
  text-align: center;
  font-weight: 600;
  line-height: 1.6;
  background: rgba(252, 201, 32, 0.1);
  border: 2px solid #FCC920;
  border-radius: 8px;
  padding: 16px;
`;
