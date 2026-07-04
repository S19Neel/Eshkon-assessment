import { Section } from "@/lib/schema/page";

export interface PropEditorProps {
  section?: Section | null;
}

export interface SectionListEditorProps {
  sections: Section[];
}

export interface SectionListItemProps {
  section: Section;
  index: number;
  isSelected: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string, type: string) => void;
  onDragStart: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  onDrop: (e: React.DragEvent<HTMLLIElement>, index: number) => void;
  onDragEnd: () => void;
}

export type SectionType = "hero" | "featureGrid" | "testimonial" | "cta";

export interface AddSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSection: (type: SectionType) => void;
}

export interface DeleteSectionDialogProps {
  open: boolean;
  sectionId: string | null;
  sectionType: string | null;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export interface HeroPropFormProps {
  sectionId: string;
  title: string;
  subtitle: string;
  align: string;
  onChange: (key: string, value: unknown) => void;
}

export interface CtaPropFormProps {
  sectionId: string;
  label: string;
  url: string;
  style: string;
  onChange: (key: string, value: unknown) => void;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface FeatureGridPropFormProps {
  sectionId: string;
  features: FeatureItem[];
  columns: string;
  onChange: (key: string, value: unknown) => void;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
}

export interface TestimonialPropFormProps {
  sectionId: string;
  testimonials: TestimonialItem[];
  columns: string;
  onChange: (key: string, value: unknown) => void;
}
