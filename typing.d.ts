type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface Contact extends Base {
  contact_infos?: {
    address?: string;
    telephone?: string;
    email?: string;
    facebook?: string;
    instagram?: string;
  };
  opening_hours?: {
    day: LocalizedText;
    time: string;
  }[];
}

interface AboutPage extends Base {
  images?: Image[];
  banner?: LocalizedText[];
  sections?: AboutSection[];
}

interface AboutSection extends Base {
  title: LocalizedText;
  description: LocalizedText;
  image: Image;
}

interface HomePage extends Base {
  banner?: LocalizedText[];
  gallery_section?: GallerySection;
  story_section?: StorySection;
  testimonials_section?: TestimonialSection;
  wall_section?: WallSection;
}

interface GallerySection {
  title: LocalizedText;
  description?: LocalizedText;
  images: Image[];
}

interface StorySection {
  title: LocalizedText;
  description: LocalizedText;
  image: Image;
}

interface WallSection {
  title?: LocalizedText;
  images?: Image[];
}

interface TestimonialSection {
  title: LocalizedText;
  testimonials: {
    author: string;
    testimonial: LocalizedText;
    image?: Image;
  }[];
}

interface Image {
  _type: "image";
  _key: string;
  asset: Reference;
  alt?: string;
}

interface Reference {
  _ref: string;
  _type: "reference";
}

interface Category extends Base {
  title: LocalizedText;
  description?: LocalizedText;
  sub_categories?: SubCategory[];
  menu_list?: Food[];
}

interface SubCategory extends Base {
  title: LocalizedText;
  description?: LocalizedText;
  menu_list: (Food | Wine)[];
}

interface Food extends Base {
  title: LocalizedText;
  priceSection: {
    price: number;
    takeawayPrice?: number;
  };
  description?: LocalizedText;
  badge?: LocalizedText;
}

interface Wine extends Base {
  title: LocalizedText;
  priceSection: {
    bottlePrice: number;
    glassPrice: number;
    carafePrice?: number;
  };
  description?: LocalizedText;
  badge?: LocalizedText;
}

interface LocalizedText {
  sv: string;
  en: string;
}
