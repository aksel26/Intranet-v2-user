"use client";
import { LEAVE_TYPE } from "@/lib/enums";
import { Button, Divider, FloatingIndicator, Text } from "@mantine/core";
import { useState } from "react";
import classes from "./LeaveTypeBox.module.css";

export default function LeaveTypeBox({ attendance, setAttendance }: any) {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});

  const vacationType = (type: string) => {
    setAttendance(type);
  };

  const setControlRef = (name: string) => (node: HTMLButtonElement) => {
    controlsRefs[name] = node;
    setControlsRefs(controlsRefs);
  };
  return (
    <div className={classes.root} dir="ltr" ref={setRootRef}>
      <FloatingIndicator target={controlsRefs[attendance]} parent={rootRef} className={classes.indicator} />
      <div className={classes.label}>
        <Text fz={"sm"}>종일</Text>
        <Text fz={"sm"}>오전</Text>
        <Text fz={"sm"}>오후</Text>
      </div>
      <Divider my={"xs"} />
      <div className={classes.controlsGroupContainer}>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.ANNUAL_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.ANNUAL_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.ANNUAL_LEAVE }}
          >
            연차
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.AM_QUARTER)}
            ref={setControlRef(LEAVE_TYPE.AM_QUARTER)}
            mod={{ active: attendance === LEAVE_TYPE.AM_QUARTER }}
          >
            반반차
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.PM_QUARTER)}
            ref={setControlRef(LEAVE_TYPE.PM_QUARTER)}
            mod={{ active: attendance === LEAVE_TYPE.PM_QUARTER }}
          >
            반반차
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.HEALTH_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.HEALTH_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.HEALTH_LEAVE }}
          >
            보건휴가
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.AM_HALF)}
            ref={setControlRef(LEAVE_TYPE.AM_HALF)}
            mod={{ active: attendance === LEAVE_TYPE.AM_HALF }}
          >
            반차
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.PM_HALF)}
            ref={setControlRef(LEAVE_TYPE.PM_HALF)}
            mod={{ active: attendance === LEAVE_TYPE.PM_HALF }}
          >
            반차
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.SICK_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.SICK_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.SICK_LEAVE }}
          >
            병가
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.AM_ALTERNATIVE_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.AM_ALTERNATIVE_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.AM_ALTERNATIVE_LEAVE }}
          >
            대체휴무
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.PM_ALTERNATIVE_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.PM_ALTERNATIVE_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.PM_ALTERNATIVE_LEAVE }}
          >
            대체휴무
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.FAMILY_EVENT_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.FAMILY_EVENT_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.FAMILY_EVENT_LEAVE }}
          >
            경조휴무
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.AM_TRAINING)}
            ref={setControlRef(LEAVE_TYPE.AM_TRAINING)}
            mod={{ active: attendance === LEAVE_TYPE.AM_TRAINING }}
          >
            훈련
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.PM_TRAINING)}
            ref={setControlRef(LEAVE_TYPE.PM_TRAINING)}
            mod={{ active: attendance === LEAVE_TYPE.PM_TRAINING }}
          >
            훈련
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.SPECIAL_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.SPECIAL_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.SPECIAL_LEAVE }}
          >
            특별휴무
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.AM_QUARTER_SPECIAL_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.AM_QUARTER_SPECIAL_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.AM_QUARTER_SPECIAL_LEAVE }}
          >
            특별휴무 반반차
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.PM_QUARTER_SPECIAL_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.PM_QUARTER_SPECIAL_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.PM_QUARTER_SPECIAL_LEAVE }}
          >
            특별휴무 반반차
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button size="sm" variant="transparent" className={classes.control} styles={{ root: { cursor: "default" } }}></Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.AM_SPECIAL_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.AM_SPECIAL_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.AM_SPECIAL_LEAVE }}
          >
            특별휴무 반차
          </Button>
          <Button
            variant="subtle"
            size="sm"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.PM_SPECIAL_LEAVE)}
            ref={setControlRef(LEAVE_TYPE.PM_SPECIAL_LEAVE)}
            mod={{ active: attendance === LEAVE_TYPE.PM_SPECIAL_LEAVE }}
          >
            특별휴무 반차
          </Button>
        </div>
      </div>
    </div>
  );
}
