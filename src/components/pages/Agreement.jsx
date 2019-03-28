import { Typography } from "antd";
import React from "react";

const { Title, Paragraph, Text } = Typography;

class AgreementPanel extends React.Component {
  render() {
    return (
      <Typography>
        <Title>介绍</Title>
        <Paragraph>
          多途医疗系统主要提供看病就诊记录，公共卫生服务通知，医疗点药物进货记录功能。
        </Paragraph>
        <Paragraph>
          本系统由刘立勇独立开发，基于Apache License Version 2.0，请注意{" "}
          <Text strong>
            本系统不会泄露任何您的个人信息，包括但不限于身份证号，电话号码，家庭住址。
          </Text>
        </Paragraph>
      </Typography>
    );
  }
}

export default AgreementPanel;
