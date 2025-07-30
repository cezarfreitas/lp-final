export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://estyle.vteximg.com.br/arquivos/ecko_mosaic5.png?v=638421392678800000)'
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content can be added here later */}
        <div className="relative z-10 flex h-full items-center justify-center">
          {/* Hero content will go here */}
        </div>
      </section>
    </div>
  );
}
