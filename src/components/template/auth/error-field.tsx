function ErrorFiled({ item }: { item: string | string[] }) {
  if (Array.isArray(item)) {
    return Object.values(item).map((item) => (
      <p className='mt-1 text-red-700' key={item}>
        {item}
      </p>
    ));
  }
  return (
    <p className='mt-1 text-red-700' key={item}>
      {item}
    </p>
  );
}

export default ErrorFiled;
