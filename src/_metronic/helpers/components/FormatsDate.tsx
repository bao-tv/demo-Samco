import React from 'react';
import dayjs from 'dayjs';

type Props = {}

export const FormatsDate: React.FC<any> = (params) => {
    const formattedDate = dayjs(params?.valueFormatted).format();
    const formattedDateString = dayjs(formattedDate).format('DD/MM/YYYY');
    return (
        <>
            <span onClick={() => console.log('bao props: ', formattedDateString)}>
                {formattedDateString}
            </span>
        </>
    );
  };

export default FormatsDate