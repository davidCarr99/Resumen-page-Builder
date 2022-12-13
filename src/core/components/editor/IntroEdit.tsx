import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import { MarkDownField } from 'src/core/widgets/MarkdownField';
import axios from 'axios';
import { useIntro } from '../../../stores/data.store';

const Wrapper = styled.div`
  margin: 2px 0;
`;

const Topic = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: blue;
  margin-bottom: 7px;
`;

const Input = styled(AntInput)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
`;

// function actulizacion(name, value){
//   const jsonInfo = '{"state":{"intro":{"name":'+ basics.name + ',"label":"Frontend Developer","image":"https://www.linkpicture.com/q/generated_photos_5e68893b6d3b380006f22f8b.jpg","email":"davidcarr1215@gmail.com","phone":"+57 3204663834","url":"www.github.com/sadanandpai/","summary":"I am a web developer having expertise in frontend development and exposure to back- end development. I design and develop web applications using the latest technologies to deliver the product with quality code.","location":{"address":"","postalCode":"","city":"Benglauru","countryCode":"","region":""},"totalExp":"6 Years","objective":"Eager to expand my skill set through external trainings to help boost all major front desk KPIs. Hoping to leverage organizational skills to help ABC Corp introduce time-saving schemes for all executives.","profiles":[{"network":"linkedin","username":"sadanandpai","url":"https://www.linkedin.com/in/sadanandpai/"},{"network":"github","username":"sadanandpai","url":"https://github.com/sadanandpai/"},{"network":"hackerrank","username":"paicube","url":"https://www.hackerrank.com/paicube/"},{"network":"leetcode","username":"paicube","url":"https://leetcode.com/paicube/"}]},"intro2":{}},"version":0}'
//   axios.post('http://cms.test/saveresume', {json: 'json', value: jsonInfo})
//   .then(function(res) {
//     console.log(res);
//   });
// }

export function IntroEdit({ METADATA, state, update }: any) {
  return (
    <>
      {METADATA.map((metadata) => (
        <Wrapper key={metadata.label}>
          <Topic>{metadata.label}</Topic>
          {metadata.type === 'Input' ? (
            <Input
              value={
                metadata.value.includes('.')
                  ? state[metadata.value.split('.')[0]][metadata.value.split('.')[1]]
                  : state[metadata.value]
              }
              data-label={metadata.value}
              onChange={(event) => update(event.target.dataset.label, event.target.value)}
            />
          ) : (
            // actulizacion(event.target.dataset.label, event.target.value)
            <MarkDownField
              value={state[metadata.value]}
              setValue={(text) => update(metadata.value, text)}
            />
          )}
        </Wrapper>
      ))}
    </>
  );
}
