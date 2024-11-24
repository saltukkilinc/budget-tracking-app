import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormDialogType = {
  children: React.ReactNode;
  title: string;
  isDialogOpen: boolean;
  setDialogOpen(open: boolean): void;
};
export default function FormDialog({
  children,
  title,
  isDialogOpen,
  setDialogOpen,
}: FormDialogType) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}