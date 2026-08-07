import BentoShowcaseBlock from './blocks/BentoShowcaseBlock.jsx'
import FooterBlock from './blocks/FooterBlock.jsx'
import FeaturesBlock from './blocks/FeaturesBlock.jsx'
import HeroBlock from './blocks/HeroBlock.jsx'
import NavbarBlock from './blocks/NavbarBlock.jsx'
import PricingBlock from './blocks/PricingBlock.jsx'
import TestimonialsBlock from './blocks/TestimonialsBlock.jsx'

const blockRegistry = {
  navbar: NavbarBlock,
  hero: HeroBlock,
  features: FeaturesBlock,
  bento: BentoShowcaseBlock,
  pricing: PricingBlock,
  testimonials: TestimonialsBlock,
  footer: FooterBlock,
}

export default blockRegistry
