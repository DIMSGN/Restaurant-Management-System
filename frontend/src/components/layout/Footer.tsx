const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          @{new Date().getFullYear()} Restaurant Management System
        </div>
      </div>
    </footer>
  );
};

export default Footer;
