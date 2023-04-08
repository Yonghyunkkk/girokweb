import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeSettings } from "../styles/theme/theme";

const ParagraphBase = styled.p`
  line-height: 200%;
  font-weight: 300;
  @media (min-width: 768px) {
    line-height: 180%;
  }
`;
export const ContentWrap = styled(motion.div)`
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: 1024px) {
    padding: 0 6rem;
  }
`;

interface SectionWrapProps {
  $paddingBottom?: boolean;
  $outerMargin?: boolean;
}

export const SectionWrap = styled(ContentWrap)<SectionWrapProps>`
  padding-top: 3rem;
  position: relative;
  margin: 0 auto;
  // ${({ $outerMargin }) => $outerMargin && `margin:3rem 0;`}
  ${({ $paddingBottom }) => $paddingBottom && `padding-bottom:3rem;`}

  @media(min-width:1024px) {
    padding-top: 6rem;
    ${({ $paddingBottom }) => $paddingBottom && `padding-bottom:6rem;`}// ${({
      $outerMargin,
    }) => $outerMargin && `margin:6rem 0rem;`}
  }
`;

export const BlogLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  & strong {
    font-weight: 500 !important;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  }
`;

export const FAQWrap = styled(motion.div)`
  & p {
    padding-bottom: 0 !important;
    margin-bottom: 1.5rem !important;
  }
  & .faq-answer-wrapper {
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
  }
`;

export const PostWrap = styled(SectionWrap)`
    & p{
        margin-bottom:2rem;
        font-weight:300;
    }

    & h3{
        font-weight:500;
        margin-bottom:2rem;
        font-size:20px;
    }

    & h2{
        padding-bottom: 1rem
        padding-top: 2rem
        font-weight: 600
    }

    & h4{
        font-weight:500;
    }

    & h1{
        font-weight:600;
    }

    & a{
        color:${ThemeSettings.secondary};
        transition: all .3s ease;
        &:hover{
            text-decoration: underline;
        }
    }
`;

export const Paragraph32 = styled(ParagraphBase)`
  font-size: 24px;
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export const Paragraph24 = styled(ParagraphBase)`
  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;
export const Paragraph20 = styled(ParagraphBase)`
  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

export const Paragraph16 = styled(ParagraphBase)`
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const Paragraph14 = styled(ParagraphBase)`
  font-size: 14px;
`;

export const Paragraph12 = styled(ParagraphBase)`
  font-size: 12px;
`;

export const H1Heading128 = styled.h1`
  line-height: 100%;
  font-size: 64px;
  padding-bottom: 1.5rem;
  @media (min-width: 992px) {
    font-size: 100px;
    padding-bottom: 3rem;
  }
`;

export const Heading128 = styled.h2`
  line-height: 100%;
  font-size: 64px;
  padding-bottom: 1.5rem;
  @media (min-width: 992px) {
    font-size: 100px;
    padding-bottom: 3rem;
  }
`;

export const H1Heading64 = styled.h1`
  font-size: 32px;
  @media (min-width: 768px) {
    font-size: 64px;
  }
`;

export const Heading64 = styled.h2`
  font-size: 32px;
  @media (min-width: 768px) {
    font-size: 64px;
  }
`;

export const H1Heading48 = styled.h1`
  font-size: 24px;
  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

export const Heading48 = styled.h2`
  font-size: 24px;
  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

export const H1Heading32 = styled.h1`
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 1.5rem;
  @media (min-width: 768px) {
    padding-bottom: 3rem;
    font-size: 32px;
  }
`;

export const Heading32 = styled.h2`
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 1.5rem;
  @media (min-width: 768px) {
    padding-bottom: 3rem;
    font-size: 32px;
  }
`;

export const Heading24 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 1.5rem;
  @media (min-width: 768px) {
    font-size: 24px;
    padding-bottom: 3rem;
  }
`;

interface HeadingProps {
  $paddingBottom?: boolean;
}
export const Heading20 = styled.h2<HeadingProps>`
  font-size: 20px;
  font-weight: 500;
  ${({ $paddingBottom }) => $paddingBottom && ` padding-bottom:4rem;`}
  @media (min-width: 768px) {
  }
`;

export const BlurSection = styled(SectionWrap)<{
  background: "white" | "black";
  blur?: number;
}>`
  padding-bottom: 3rem;
  @media (min-width: 768px) {
    padding-bottom: 8rem;
  }
  // backdrop-filter: blur(160px);
  // ${({ blur }) => `backdrop-filter: blur(${blur}px);`}
`;

export const CircleElement = styled.div<{
  size: number;
  color: string;
  blur?: number;
}>`
  filter: blur(250px);
  ${({ blur }) => `filter: blur(${blur}px);`}
  position: absolute;
  height: 500px;
  width: 500px;
  border-radius: 100vmax;
  ${({ size }) => `height:${size}px; width:${size}px;`}
  ${({ color }) => `background:${color};`}
`;

export const GradientCircleElement = styled.div<{
  size?: number;
  secondary?: boolean;
}>`
  background: linear-gradient(180deg, #002347 0%, rgba(0, 35, 71, 0) 100%);
  ${({ secondary }) =>
    secondary &&
    `background: linear-gradient(180deg, #FD7702 0%, rgba(253, 119, 2, 0) 100%);`}
  position: absolute;
  height: 500px;
  width: 500px;
  border-radius: 100vmax;
  z-index: -1;
  ${({ size }) => `height:${size}px; width:${size}px;`}
`;

export const OutlineCircleElement = styled.div<{
  size?: number;
  secondary?: boolean;
}>`
  border: 1px solid ${ThemeSettings.primary};
  ${({ secondary }) => secondary && `border-color:${ThemeSettings.secondary}; `}
  position: absolute;
  height: 500px;
  width: 500px;
  border-radius: 100vmax;
  z-index: -1;
  ${({ size }) => `height:${size}px; width:${size}px;`}
`;
