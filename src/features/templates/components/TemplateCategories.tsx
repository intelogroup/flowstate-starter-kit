
import { Card, CardContent } from "@/components/ui/card";
import { TemplateCategory } from "../types";

interface TemplateCategoriesProps {
  categories: TemplateCategory[];
}

const TemplateCategories = ({ categories }: TemplateCategoriesProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map(category => {
        const Icon = category.icon;
        return (
          <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.templateCount} templates</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TemplateCategories;
