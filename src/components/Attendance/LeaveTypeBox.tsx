"use client";
import { LEAVE_TYPE } from "@/lib/enums";
import { Button, Divider, FloatingIndicator, Text } from "@mantine/core";
import { useState } from "react";
import classes from "./LeaveTypeBox.module.css";

export default function LeaveTypeBox({ attendance, setAttendance }: any) {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});

  const vacationType = (type: string | number) => {
    setAttendance(type);
  };

  const setControlRef = (name: string | number) => (node: HTMLButtonElement) => {
    controlsRefs[name] = node;
    setControlsRefs(controlsRefs);
  };
  return (
    <div className={classes.root} dir="ltr" ref={setRootRef}>
      <FloatingIndicator target={controlsRefs[attendance]} parent={rootRef} className={classes.indicator} />
      <div className={classes.label}>
        <Text fz={"xs"}>종일</Text>
        <Text fz={"xs"}>오전</Text>
        <Text fz={"xs"}>오후</Text>
      </div>
      <Divider my={"xs"} />
      <div className={classes.controlsGroupContainer}>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.연차)}
            ref={setControlRef(LEAVE_TYPE.연차)}
            mod={{ active: attendance === LEAVE_TYPE.연차 }}
          >
            연차
          </Button>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["오전 반반차"])}
            ref={setControlRef(LEAVE_TYPE["오전 반반차"])}
            mod={{ active: attendance === LEAVE_TYPE["오전 반반차"] }}
          >
            반반차
          </Button>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["오후 반반차"])}
            ref={setControlRef(LEAVE_TYPE["오후 반반차"])}
            mod={{ active: attendance === LEAVE_TYPE["오후 반반차"] }}
          >
            반반차
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.보건휴가)}
            ref={setControlRef(LEAVE_TYPE.보건휴가)}
            mod={{ active: attendance === LEAVE_TYPE.보건휴가 }}
          >
            보건휴가
          </Button>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["오전 반차"])}
            ref={setControlRef(LEAVE_TYPE["오전 반차"])}
            mod={{ active: attendance === LEAVE_TYPE["오전 반차"] }}
          >
            반차
          </Button>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["오후 반차"])}
            ref={setControlRef(LEAVE_TYPE["오후 반차"])}
            mod={{ active: attendance === LEAVE_TYPE["오후 반차"] }}
          >
            반차
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.병가)}
            ref={setControlRef(LEAVE_TYPE.병가)}
            mod={{ active: attendance === LEAVE_TYPE.병가 }}
          >
            병가
          </Button>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["대체 휴무(오전)"])}
            ref={setControlRef(LEAVE_TYPE["대체 휴무(오전)"])}
            mod={{ active: attendance === LEAVE_TYPE["대체 휴무(오전)"] }}
          >
            대체휴무
          </Button>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["대체 휴무(오후)"])}
            ref={setControlRef(LEAVE_TYPE["대체 휴무(오후)"])}
            mod={{ active: attendance === LEAVE_TYPE["대체 휴무(오후)"] }}
          >
            대체휴무
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE.훈련)}
            ref={setControlRef(LEAVE_TYPE.훈련)}
            mod={{ active: attendance === LEAVE_TYPE.훈련 }}
          >
            훈련
          </Button>

          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["훈련(오전)"])}
            ref={setControlRef(LEAVE_TYPE["훈련(오전)"])}
            mod={{ active: attendance === LEAVE_TYPE["훈련(오전)"] }}
          >
            훈련
          </Button>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["훈련(오후)"])}
            ref={setControlRef(LEAVE_TYPE["훈련(오후)"])}
            mod={{ active: attendance === LEAVE_TYPE["훈련(오후)"] }}
          >
            훈련
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["특별 휴무"])}
            ref={setControlRef(LEAVE_TYPE["특별 휴무"])}
            mod={{ active: attendance === LEAVE_TYPE["특별 휴무"] }}
          >
            특별휴무
          </Button>

          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["특별 휴무(오전 반반)"])}
            ref={setControlRef(LEAVE_TYPE["특별 휴무(오전 반반)"])}
            mod={{ active: attendance === LEAVE_TYPE["특별 휴무(오전 반반)"] }}
          >
            특별휴무 반반차
          </Button>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["특별 휴무(오후 반반)"])}
            ref={setControlRef(LEAVE_TYPE["특별 휴무(오후 반반)"])}
            mod={{ active: attendance === LEAVE_TYPE["특별 휴무(오후 반반)"] }}
          >
            특별휴무 반반차
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["경조 휴무"])}
            ref={setControlRef(LEAVE_TYPE["경조 휴무"])}
            mod={{ active: attendance === LEAVE_TYPE["경조 휴무"] }}
          >
            경조휴무
          </Button>

          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["특별 휴무(오전)"])}
            ref={setControlRef(LEAVE_TYPE["특별 휴무(오전)"])}
            mod={{ active: attendance === LEAVE_TYPE["특별 휴무(오전)"] }}
          >
            특별휴무 반차
          </Button>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["특별 휴무(오후)"])}
            ref={setControlRef(LEAVE_TYPE["특별 휴무(오후)"])}
            mod={{ active: attendance === LEAVE_TYPE["특별 휴무(오후)"] }}
          >
            특별휴무 반차
          </Button>
        </div>
        <div className={classes.controlsGroup}>
          <Button
            variant="subtle"
            size="xs"
            className={classes.control}
            onClick={() => vacationType(LEAVE_TYPE["대체 휴무"])}
            ref={setControlRef(LEAVE_TYPE["대체 휴무"])}
            mod={{ active: attendance === LEAVE_TYPE["대체 휴무"] }}
          >
            대체휴무
          </Button>
          <Button size="xs" variant="transparent" className={classes.control} styles={{ root: { cursor: "default" } }}></Button>
          <Button size="xs" variant="transparent" className={classes.control} styles={{ root: { cursor: "default" } }}></Button>
        </div>
      </div>
    </div>
  );
}
