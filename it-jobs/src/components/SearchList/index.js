import { useEffect, useState } from "react";
import { getListCompany } from "../../services/companyService";
import { JobItem } from "../JobItem.js";
import { Col, Row } from "antd";
import { GoBack } from "../GoBack/index.js";

export const SearchList = (props) => {
  const { data } = props;
  const [dataFinal, setDataFinal] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const company = (await getListCompany()) || [];

      const newData = data.map((item) => {
        const infoCompany = company.find(
          (itemCompany) => itemCompany.id == item.idCompany
        );
        return {
          ...item,
          infoCompany: infoCompany || null,
        };
      });
      setDataFinal(newData);
    };
    fetchApi();
  }, [data]);

  return (
    <>      
      {dataFinal.length > 0 ? (
        <Row className="mb-4" gutter={[20, 20]}>
          {dataFinal.map((item) => (
            <Col span={8} className="job-item" key={item.id}>
              <JobItem item={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="mb-4">
          <h3>Not Found</h3>
        </div>
      )}
    </>
  );
};