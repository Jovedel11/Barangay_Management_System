import { toast } from "sonner";

export const CustomToast = ({ description, status }) => {
  if (!description || !status) return;
  toast[status](description, {
    className:
      "!border-slate-300 dark:!border-slate-700 font-inter !bg-slate-100 dark:!bg-slate-900 !text-slate-700 dark:!text-slate-200",
    duration: 3000,
    position: "bottom-right",
  });
};
