export default function Head() {
  const title = "WiCon • Training";
  const description =
    "Training programs by WiCon Systems: digital skills, smart automation, and hands-on workshops for students and professionals in Cameroon.";
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
