interface LayoutProps {
  header: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}

export const Layout = ({ header, left, right }: LayoutProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{header}</div>
      <div style={{ display: "flex", flexDirection: "row", width: '100vh' }}>
        <div style={{padding: '10px'}}>{left}</div>
        <div style={{padding: '10px'}}>{right}</div>
      </div>
    </div>
  );
};
