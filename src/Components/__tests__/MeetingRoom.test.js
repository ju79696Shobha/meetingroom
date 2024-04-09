import { render,waitFor, screen, cleanup } from '@testing-library/react';
import MeetingRoomList from '../MeetingRoomList';
import {fetchMeetingRooms } from '../MeetingRoomList';
import {createMeetingRoom} from '../BookMeetingRoom';

jest.mock(fetchMeetingRooms)

describe(MeetingRoomList, () => {

    const mockedtestData =  [{"id":1,"name":"Phineas","floor":"1st floor","building":"1st building"},
    {"id":2,"name":"Phi","floor":"2nd floor","building":"1st building"},
    {"id":3,"name":"XYZ","floor":"3rd floor","building":"1st building"},
    {"id":4,"name":"ABC","floor":"4th floor","building":"2nd building"},
    {"id":5,"name":"DEF","floor":"5th floor","building":"2nd building"}]

    global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ data: mockedtestData })
    });

    test('renders meeting rooms', async () => {
        render(<MeetingRoomList />);

        const findByText = (container, text) => {
            return Array.from(container.querySelectorAll('*')).find(node => node.textContent === text);
          };
          
          // Usage in test case
          const element = getByTestId(container, 'Phineas');
          expect(element).toBeInTheDocument();
    });
});
