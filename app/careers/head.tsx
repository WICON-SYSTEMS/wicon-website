export default function Head() {
  const title = "WiCon • Careers";
  const description =
    "Apply for internships and careers at WiCon Systems. Build your future in smart automation, electrical engineering, and technology.";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
