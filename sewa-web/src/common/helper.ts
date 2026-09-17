const optionMapFn = (data: any) => {
  return data.map((datum: any) => ({
    label: datum.name,
    value: datum.id,
  }));
};

export { optionMapFn };
