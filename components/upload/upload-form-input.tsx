import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const UploadFormInput = ({ onSubmit }: UploadFormInputProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex items-center justify-end gap-1.5">
        <Input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required={true}
          className=""
        />
        <Button>Upload your PDF</Button>
      </div>
    </form>
  );
};
