import { useState, useEffect } from "react";

function useFetch(url: string, isGettingNow: boolean | undefined = true) {
  const [data, setData] = useState<object | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const get = async () => {
    setIsPending(true);
    setError(null);

    try {
      const res: Response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Could not fetch the data");
      const data = res.json();
      setIsPending(false);
      setData(data);
      setError(null);
    } catch (err: unknown) {
      setIsPending(false);
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const postData = async (data: any) => {
    setIsPending(true);
    setError(null);

    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: data,
    });
    // console.log(res);
    if (!res.ok) throw new Error("Can't fetch the data");
    else return res.json();
  };

  const modifyUrl = (newUrl: string) => {
    url = newUrl;
  };

  useEffect(() => {
    if (isGettingNow) get();
  }, [url]);

  return { data, isPending, error, get, postData, modifyUrl };
}

export default useFetch;
