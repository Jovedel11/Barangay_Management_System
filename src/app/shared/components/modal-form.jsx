import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Checkbox } from "@/core/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group";

const ModalForm = ({
  isOpen,
  onClose,
  title,
  description,
  fields = [],
  formData,
  setFormData,
  onSubmit,
  isLoading = false,
  submitText = "Save",
  cancelText = "Cancel",
  size = "default", // sm, default, lg, xl
}) => {
  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field) => {
    const value = formData[field.name] || field.defaultValue || "";

    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "date":
      case "time":
        return (
          <Input
            id={field.name}
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            className={`bg-background border-border text-foreground ${
              field.className || ""
            }`}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={field.name}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            rows={field.rows || 3}
            className={`bg-background border-border text-foreground ${
              field.className || ""
            }`}
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(newValue) =>
              handleInputChange(field.name, newValue)
            }
            required={field.required}
            disabled={field.disabled}
          >
            <SelectTrigger
              className={`bg-background border-border text-foreground ${
                field.className || ""
              }`}
            >
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {field.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={value}
              onCheckedChange={(checked) =>
                handleInputChange(field.name, checked)
              }
              className="border-border"
            />
            <Label htmlFor={field.name} className="text-sm text-foreground">
              {field.checkboxLabel}
            </Label>
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={(newValue) =>
              handleInputChange(field.name, newValue)
            }
            className={field.className}
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${field.name}-${option.value}`}
                  className="border-border"
                />
                <Label
                  htmlFor={`${field.name}-${option.value}`}
                  className="text-sm text-foreground"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "custom":
        return field.render ? field.render(value, handleInputChange) : null;

      default:
        return null;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "s":
        return "max-w-sm w-[420px] max-h-[80vh] overflow-y-auto";
      case "sm":
        return "max-w-md";
      case "lg":
        return "max-w-2xl";
      case "xl":
        return "max-w-4xl";
      default:
        return "max-w-lg";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${getSizeClass()} bg-card border-border`}>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="border-b border-border pb-4">
            <DialogTitle className="text-foreground">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-muted-foreground">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div
                key={field.name}
                className={`grid gap-2 ${field.gridClassName || ""}`}
              >
                {field.label && (
                  <Label
                    htmlFor={field.name}
                    className="text-sm font-medium text-foreground"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                )}
                {renderField(field)}
                {field.helper && (
                  <p className="text-xs text-muted-foreground">
                    {field.helper}
                  </p>
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground hover:bg-muted"
            >
              {cancelText}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? "Loading..." : submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalForm;
