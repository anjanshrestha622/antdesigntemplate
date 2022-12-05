import { Form, Input, Radio } from 'antd';

export default function OptionsInput({ options, setOptions, answer, setAnswer }) {
  const handleChange = (e, index) => {
    setOptions((oldState) => {
      oldState[index] = e.target.value;
      return oldState;
    });
  };

  return (
    <Form.Item label="Answers" required>
      <Radio.Group value={answer} onChange={(e) => setAnswer(e.target.value)}>
        {[...new Array(4)].map((_, index) => (
          <Radio value={options[index]} key={index}>
            <Input
              placeholder={`Option ${index}`}
              allowClear
              onChange={(e) => handleChange(e, index)}
            />
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
}
