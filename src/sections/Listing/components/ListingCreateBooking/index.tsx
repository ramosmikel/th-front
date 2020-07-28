import React from "react";
import moment, { Moment } from "moment";
import { Button, Card, DatePicker, Divider, Typography } from "antd";
import { formatListingPrice, displayErrorMessage } from "../../../../lib/utils";

const { Paragraph, Text, Title } = Typography;

interface Props {
  price: number;
  checkInDate: Moment | null;
  checkOutDate: Moment | null;
  setCheckInDate: (checkInDate: Moment | null) => void;
  setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}: Props) => {
  const disabledDate = (currentDate?: Moment) => {
    if (currentDate) {
      const dateIfBeforeEndOfDay = currentDate.isBefore(moment().endOf("day"));

      return dateIfBeforeEndOfDay;
    } else {
      return false;
    }
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
        return displayErrorMessage(
          `You can't book date of check out prior to check in!`
        );
      }
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate ? checkInDate : undefined}
              onChange={(dateValue) => setCheckInDate(dateValue)}
              onOpenChange={() => setCheckOutDate(null)}
              format={"YYYY/MM/DD"}
              showToday={false}
              disabledDate={(currentDate?: Moment) => disabledDate(currentDate)}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              disabled={checkOutInputDisabled}
              value={checkOutDate ? checkOutDate : undefined}
              onChange={(dateValue) => verifyAndSetCheckOutDate(dateValue)}
              format={"YYYY/MM/DD"}
              showToday={false}
              disabledDate={(currentDate?: Moment) => disabledDate(currentDate)}
            />
          </div>
        </div>
        <Divider />
        <Button
          size="large"
          type="primary"
          className="listing-booking__card-cta"
          disabled={buttonDisabled}
        >
          Request to book!
        </Button>
      </Card>
    </div>
  );
};
