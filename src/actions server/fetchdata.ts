const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

export const ExerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': RAPID_API_KEY ?? '',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};

export const FetchData = async (url : string, options: RequestInit) => {
   try{
      const response = await fetch(url, options);

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);

      }

      const data = await response.json();
      console.log('API Response:', data);
      return data;

   }  catch (error) {
      console.log('Fetch error: ', error);
      throw error;
   }
};


