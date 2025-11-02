import { Col, Row } from "antd";
import { CompanyInfo } from "./CompanyInfo";
import { JobStatistic } from "./JobStatistic ";
import { CVStatistic } from "./CVStatistic";

export const Dashboard = () => {
  return (
    <>
      <h1>Page Dashboard</h1>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <CompanyInfo />
        </Col>
        <Col span={8}>
          <JobStatistic />
        </Col>
        <Col span={8}>
          <CVStatistic />
        </Col>
      </Row>
    </>
  )
}