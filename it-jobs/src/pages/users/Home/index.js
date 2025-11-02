import { CompanyList } from "../../../components/CompanyList";
import { SearchForm } from "../../../components/SearchForm";
import { TagsList } from "../../../components/TagsList";

export const Home = () => {
  return (
    <>
      <h1>100+ IT Jobs For Developers</h1>
      <SearchForm />
      <TagsList />
      <CompanyList />
    </>
  );
};