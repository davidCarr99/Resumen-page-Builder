import React from 'react';
import styled from 'styled-components';
import { Timeline } from 'antd';
import { Flex } from 'src/styles/styles';
import MarkdownIt from 'markdown-it';

const FlexTimeline = styled(Timeline)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: 100%;
  padding-top: 15px;
  color: ${(props: any) => props.theme.fontColor};

  ul {
    padding-left: 16px;
    margin-bottom: 0;
    font-size: 0.8rem;
  }
`;

const TimelineItem = styled(FlexTimeline.Item)`
  padding-bottom: 0;
  flex-grow: 1;
  padding-bottom: 20px;

  :last-child {
    flex-grow: 0;
    padding-bottom: 0;
  }
`;

const ReferenceRef = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const ReferenceName = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: inherit;
`;

const ReferencePhone = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: inherit;
`;

const mdParser = new MarkdownIt(/* Markdown-it options */);

export function ReferenceHeader({ reference }: any) {
  return (
    <>
      <Flex jc="space-between" ai="flex-end" style={{ lineHeight: 'initial' }}>
        <ReferenceRef>{reference.ref}</ReferenceRef>
      </Flex>
      <Flex jc="space-between" ai="flex-end">
        <ReferenceName>{reference.name}</ReferenceName>
        <ReferencePhone>{reference.phone}</ReferencePhone>
      </Flex>
    </>
  );
}

export function Ref({ references, styles }: any) {
  return (
    <FlexTimeline style={styles}>
      {references.map((reference: any, index: number) => (
        <TimelineItem key={`${reference.name}-${index}`}>
          <ReferenceHeader reference={reference} />
          <div dangerouslySetInnerHTML={{ __html: mdParser.render(reference.info ?? '') }} />
        </TimelineItem>
      ))}
    </FlexTimeline>
  );
}