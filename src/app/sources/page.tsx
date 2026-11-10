import ReactMarkdown from 'react-markdown';

export default function SourcesPage() {
  const markdownContent = `
# Data Sources & References

Here are the sources and references used for our articles:
- **Source 1**: Reed, J. (2026, October 25). Five pivotal ravens matchups to watch vs. Bengals. Baltimore Ravens On SI; Raven Country. [View Source Link](https://www.si.com/nfl/ravens/onsi/five-pivotal-ravens-matchups-to-watch-vs-bengals-01m5rf35w5x2)

- **Source 2**: Pro Football Focus. (2026, October 25). Amarius Mims. Pro Football Focus. [View PFF Profile](https://www.pff.com/nfl/players/amarius-mims/146719) 
  `;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ReactMarkdown 
        components={{
          // Adds professional blue coloring, underlines, and safe new-tab opening for all links
          a: ({ node, ...props }) => (
            <a {...props} className="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer" />
          ),
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
          p: ({ node, ...props }) => <p className="leading-relaxed my-3" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-3" {...props} />,
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}