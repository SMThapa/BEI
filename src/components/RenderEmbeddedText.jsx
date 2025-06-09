import DOMPurify from 'dompurify';

export const RenderEmbeddedText = ({ embeddedText }) => {
  const sanitizedHTML = DOMPurify.sanitize(embeddedText);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};
