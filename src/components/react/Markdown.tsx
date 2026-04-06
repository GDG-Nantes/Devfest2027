import React, { type ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const Markdown: React.FC<{ content?: string; className?: string }> = ({
  content,
  className,
}) => {
  const LinkRenderer = ({ href, children, ...props }: ComponentProps<'a'>) => {
    if (href && !/^https?:\/\/|^www\./i.test(href)) {
      href = 'https://' + href;
    }

    return (
      <a
        className='md-link'
        href={href ?? '#'}
        target='_blank'
        rel='noopener noreferrer'
        {...props}
      >
        {children}
      </a>
    );
  };

  return (
    <>
      {content && (
        <div className={className}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{ a: LinkRenderer }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
};
