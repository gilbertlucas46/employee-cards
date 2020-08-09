import styled, { css } from "styled-components";
import { useSpring, animated }  from 'react-spring';
import { darken } from "polished";

const Card = styled.div`
    padding: 1.2em;
    border-radius: 0.5em;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.5s;
    will-change: transform;
    border: 15px solid white;
    &:hover {
        box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
    }
    ${({ employee }) =>
        employee &&
        css`
            background-color: ${({ isActive, theme }) =>
                isActive ? theme.colors.purple : theme.colors.gray};
            color: ${({ isActive, theme }) =>
                isActive ? theme.colors.white : theme.colors.darkGray};
            border: 1px solid
                ${({ isActive, theme }) =>
                    darken(
                        0.08,
                        isActive ? theme.colors.purple : theme.colors.lightGray
                    )};
        `}
    h3 {
        font-size: 1.6em;
        margin-bottom: 0.2em;
    }
    h4 {
        font-size: 1em;
    }
`;

const HeadShot = styled.figure`
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */

    width: 100%;
    height: 14em;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center center;
`;

const Caption = styled.div`
    padding: 1.2em 0 0.5em;
`;

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`


const EmployeeCard = ({ employee, index }) => {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 500, friction: 145 } }))
    const { image, name, status, position } = employee;
    const isActive = status === "active";
    return (
        <animated.div
            className="card"
            onMouseMove={({ clientX: x, clientY: y }) =>
                set({ xys: calc(x, y) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.interpolate(trans) }}
        >
            <Card isActive={isActive} employee={employee}>
                <HeadShot image={image} />
                <Caption>
                    <h3>{name}</h3>
                    <h4>{position}</h4>
                </Caption>
            </Card>
        </animated.div>
    );
};

export default EmployeeCard;
