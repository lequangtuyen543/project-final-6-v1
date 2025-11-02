import { useSearchParams } from 'react-router-dom'
import { Tag } from 'antd'
import { getListJobs } from '../../../services/jobsServices';
import { useEffect, useState } from 'react';
import { SearchList } from '../../../components/SearchList';
import { GoBack } from '../../../components/GoBack';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const citySearch = searchParams.get('city') || '';
  const keywordSearch = searchParams.get('keyword') || '';
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getListJobs();
      if (response) {
        const newData = response.filter((item) => {
          const city = citySearch ? item.city?.includes(citySearch) : true;
          const keyword = keywordSearch
            ? item.tags?.some(tag => tag.toLowerCase().includes(keywordSearch.toLowerCase()))
            : true;
          const status = item.status; //item.status == 'true';
          return city && keyword && status;
        });
        setData(newData.reverse());
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <GoBack />
      <div className='my-3'>
        <strong>Search Result: </strong>
        {citySearch && <Tag>{citySearch}</Tag>}
        {keywordSearch && <Tag>{keywordSearch}</Tag>}
      </div>
      {data && <SearchList data={data} />}
    </>
  )
}