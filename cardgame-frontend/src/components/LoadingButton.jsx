export default function LoadingButton({ loading, children, ...props }) {
  return (
    <button {...props} disabled={loading}>
      {loading ? (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="animate-spin">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
          Carregando...
        </>
      ) : (
        children
      )}
    </button>
  );
}