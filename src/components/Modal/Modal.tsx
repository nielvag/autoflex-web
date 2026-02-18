import { Content, Overlay, Portal, Root, Title } from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import XIcon from "../../assets/icons/x.svg?react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <Root open={open}>
      <Portal>
        <Overlay
          className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow"
          onClick={onClose}
        />
        <Content className="fixed bg-white left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-150 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-6.25 shadow-(--shadow-6) focus:outline-none data-[state=open]:animate-contentShow">
          {title && (
            <Title className="mb-5 text-lg font-semibold text-mauve12">
              {title}
            </Title>
          )}
          <button className="fixed top-4 right-4" onClick={onClose}>
            <XIcon className="text-black w-6" />
          </button>
          <div>{children}</div>
        </Content>
      </Portal>
    </Root>
  );
}
