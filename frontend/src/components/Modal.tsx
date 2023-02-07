export interface IModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ title, children, isOpen }: IModalProps) {
  return (
    <div
      className="modal-overlay"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-box">
        <div className="modal-title">
          <h3>{title}</h3>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
