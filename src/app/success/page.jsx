"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Heart, CheckCircle, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    if (!celebrated) {
      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const colors = ["#FCC920", "#4ECDC4", "#FFD93D", "#9b59b6"];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      setCelebrated(true);
    }
  }, [celebrated]);

  return (
    <Container>
      <BackgroundOrbs>
        <Orb color="#FCC920" top="10%" left="5%" size="500px" delay={0} />
        <Orb color="#4ECDC4" top="60%" left="80%" size="450px" delay={1} />
        <Orb color="#FFD93D" top="75%" left="10%" size="400px" delay={2} />
        <Orb color="#9b59b6" top="40%" left="90%" size="350px" delay={1.5} />
      </BackgroundOrbs>

      <SuccessContainer>
        <LogoContainer>
          <Logo src="https://evvntly.com/images/white.png" alt="Evvntly" />
        </LogoContainer>

        <IconContainer>
          <CheckCircle size={80} color="#10B981" />
        </IconContainer>

        <Title>Thank You! 🎉</Title>

        {amount && (
          <AmountText>
            Your donation of <AmountHighlight>${amount}</AmountHighlight> means the world to us!
          </AmountText>
        )}

        <Message>
          Your generosity helps us continue building and improving Evvntly for everyone. We're grateful to have supporters like you in our community.
        </Message>

        <HeartContainer>
          <Heart size={32} color="#FCC920" fill="#FCC920" />
        </HeartContainer>

        <ImpactSection>
          <ImpactTitle>Your Impact</ImpactTitle>
          <ImpactList>
            <ImpactItem>✨ Supporting ongoing development</ImpactItem>
            <ImpactItem>🚀 Enabling new features</ImpactItem>
            <ImpactItem>💰 Covering hosting and infrastructure costs</ImpactItem>
          </ImpactList>
        </ImpactSection>

        <ButtonGroup>
          <BackButton href="/">
            <ArrowLeft size={20} />
            Make Another Donation
          </BackButton>
          <HomeButton href="https://evvntly.com">
            Go to Evvntly
          </HomeButton>
        </ButtonGroup>

        <SocialSection>
          <SocialTitle>Stay Connected</SocialTitle>
          <SocialText>
            Follow us on social media to see how your donation is making a difference!
          </SocialText>
          <SocialLinks>
            <SocialLink href="https://twitter.com/evvntly" target="_blank" rel="noopener noreferrer">
              Twitter
            </SocialLink>
            <SocialLink href="https://instagram.com/evvntly" target="_blank" rel="noopener noreferrer">
              Instagram
            </SocialLink>
          </SocialLinks>
        </SocialSection>
      </SuccessContainer>
    </Container>
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
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

const SuccessContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 50px 40px;
  text-align: center;

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
  height: 50px;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const AmountText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  margin-bottom: 24px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const AmountHighlight = styled.span`
  color: #10B981;
  font-weight: 700;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Message = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 18px;
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const HeartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  animation: ${pulse} 2s ease-in-out infinite;
  animation-delay: 0.5s;
`;

const ImpactSection = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
`;

const ImpactTitle = styled.h3`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ImpactList = styled.div`
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
`;

const ImpactItem = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  line-height: 2;
  padding-left: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BackButton = styled.a`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const HomeButton = styled.a`
  flex: 1;
  background: linear-gradient(135deg, #FCC920 0%, #FDD74F 100%);
  color: #333333;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(252, 201, 32, 0.4);
  }
`;

const SocialSection = styled.div`
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
`;

const SocialTitle = styled.h4`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const SocialText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  margin-bottom: 16px;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const SocialLink = styled.a`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
`;
