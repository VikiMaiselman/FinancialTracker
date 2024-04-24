export default function ButtonMenu({ children, ...props }) {
  return (
    <menu className="flex justify-center gap-5" {...props}>
      {children}
    </menu>
  );
}
