import styled from "styled-components";
import {Container, colors, spacing, shadows, transitions, borderRadius} from "../../globalStyles";

export const SpecialitiesLayout = styled.div`
    overflow: visible;
    padding-bottom: 20px;
    margin-top: 0px;
`
export const SpecialitiesContainer = styled(Container)`
    display: flex;
    margin-bottom: 30px;
    flex-direction: column;
    gap: 50px;
    overflow: visible;
    margin-top: 0px;
    ${Container}
    
`

export const SpecialitiesImage = styled.p`
    font-size: 25px;
    color: #2197E3;
    text-align: center;
    width: 100%;
    padding: 0px;
    object-fit: contain;
    img{
       width: 100%;
       height: 400px;
       margin: 0px;
    }
`

export const SpecialitiesHeader = styled.p`
    font-size: 25px;
    color: #2197E3;
    text-align: center;
    margin: 0 auto;
    padding-top: 20px;
`
export const HeaderUnderline = styled.div`
    border-top: 4px solid ${colors.secondary};
    width: 100%;
    margin-top: 5px;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        top: -4px;
        left: 0;
        height: 4px;
        width: 50px;
        background: ${colors.primary};
        border-radius: 0 4px 4px 0;
    }
`

export const SearchBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto !important;
    width: 56%;
    height: 50px;
    border-radius: 10px;
    margin-bottom: 10px;
    border: none;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

    input {
        flex: 1;
        height: 100%;
        border: none;
        padding: 0 16px;
        font-size: 1.2rem;
        color: ${colors.black};

        &:focus {
            outline: none;
            border: none;
        }

        &::placeholder {
            color: ${colors.mediumGrey};
        }
    }
    .text_placeholder::placeholder{
        color: black;
        font-size: 14px;
    }
    img {
        width: 30px;
        height: 30px;
        margin-right: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #eee;
            border-radius: 50%;
        }
    }
`;

export const SpecialitiesContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 35px; 
    justify-content: center;
    cursor: pointer;
    overflow: visible;

    .card-spec{
        width: 255px;
        height: 220px;
        display: flex;
        justify-content: center;
        border-radius: 20px 20px 20px 20px;
        background: linear-gradient(to bottom, #0B5E87 , #00A6A9 );
        transition: all 0.5s ease;
       
    }
    
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
    }

    .card-spec:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 20px #9e9e9e;
    }
    .speciality-img{
        width: 70px; 
        height: 70px; 
        object-fit: contain; 
        transition: all ease 0.8s;
        &:hover{
            transform: scale(1.2);
        }

    }    .image-wrapper{
        margin-top: 20px;
        width: 120px; 
        height: 120px; 
        border-radius: 50%; 
        border: 5px solid ${colors.secondary};
        background-color: #fff;
        display: flex;
        align-items: center;
        overflow: hidden;
        justify-content: center;
        transition: all ${transitions.medium};
        box-shadow: ${shadows.medium};
        position: relative;
        
        &:hover{
            transform: scale(1.2);
            border-color: ${colors.primary};
            box-shadow: 0 0 15px ${colors.secondary};
        }
        
        &::after {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            border-radius: 50%;
            border: 2px solid transparent;
            opacity: 0;
            transition: all ${transitions.medium};
        }
        
        &:hover::after {
            border-color: ${colors.white};
            opacity: 0.5;
        }
    }
    
    .name-style{
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 700;
        text-align: center;
        margin-top: 20px;
        margin-left: 5px;
        margin-right: 5px;
        color: ${colors.white};
        cursor: pointer;
        letter-spacing: 0.5px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        transition: all ${transitions.fast};
        
        &:hover {
            transform: scale(1.05);
        }
    }

    @media (max-width: 740px) {
        justify-content: center;
    }
    
`

export const SpecialitiesCard = styled.div`
    
`
export const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    margin: ${spacing.lg} 0;
`;


export const PaginationButton = styled.button`
    padding: 0.4rem 0.8rem;
    border: 2px solid ${colors.primary}; 
    background-color: transparent;
    color: ${colors.primary};
    font-weight: 500;
    transition: all ${transitions.fast};
    border-radius: 8px;
    margin: 0 5px;
    box-shadow: ${shadows.small};
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background: linear-gradient(90deg, ${colors.secondary}, ${colors.primary});
        transition: all ${transitions.medium};
        z-index: -1;
    }
    
    &:hover {
        color: white;
        border-color: ${colors.secondary};
        transform: translateY(-2px);
        box-shadow: ${shadows.medium};
        
        &:before {
            width: 100%;
        }
    }
    width: 90px;
    border-radius: 5px;
    text-transform: uppercase;


    &:disabled {
        opacity: 0.3;
    }
`;

export const PaginationInfo = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

export const PageInput = styled.input`
    border: 1px solid #D1D5DB;
    padding: 0.25rem;
    border-radius: 0.25rem;
    width: 4rem;
    background-color: transparent;
`;

export const PageSelect = styled.select`
    padding: 0.5rem;
    background-color: transparent;
`;

