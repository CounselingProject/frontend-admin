import styled from 'styled-components';

// StyledDt 정의
export const StyledDt = styled.dt`
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.green};
`;