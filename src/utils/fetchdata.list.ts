type FetchOptionsParams = {
  apiFunc: (query: string) => Promise<any>;
  labelField?: string;
  valueField?: string;
  queryString?: string;
};

export async function fetchSelectOptions(
  params: FetchOptionsParams
): Promise<IOptionSelect[]> {
  const {
    apiFunc,
    labelField = "name",
    valueField = "id",
    queryString = "current=1&pageSize=100",
  } = params;

  const res = await apiFunc(queryString);
  if (res && res.data?.result) {
    return res.data.result.map((item: any) => ({
      label: item[labelField] as string | number,
      value: item[valueField] as string | number,
      key: item[valueField]?.toString(),
    }));
  }
  return [];
}