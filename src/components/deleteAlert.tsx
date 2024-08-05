import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteAlert({
  children,
  examName,
  isShowConfirm,
  confirmDelete,
  cancelDelete,
}: {
  children: React.ReactNode;
  examName: string;
  isShowConfirm: boolean;
  confirmDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cancelDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <AlertDialog open={isShowConfirm} onOpenChange={() => !isShowConfirm}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-neutral-950">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-neutral-950">
            This action cannot be undone. Are you sure you want to delete{" "}
            {examName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-neutral-950 hover:bg-neutral-100"
            onClick={(e) => {
              cancelDelete(e);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-zinc-800 hover:bg-zinc-700"
            onClick={(e) => {
              confirmDelete(e);
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
