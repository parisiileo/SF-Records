type Category = {
  id: number;
  label: string;
  original: string;
  url: string;
};

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  image_path: string;
  availability_status: string;
  price: number;
  badge_tooltip: string;
};
