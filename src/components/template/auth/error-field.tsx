function ErrorFiled(item: string[]) {
  return Object.values(item).map((item) => (
    <p className='mt-1 text-red-700' key={item}>
      {item}
    </p>
  ));
}

export default ErrorFiled;
