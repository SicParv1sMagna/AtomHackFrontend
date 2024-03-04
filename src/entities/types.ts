export type ReportStatus = 'SUCCESS' | 'PENDING' | 'ERROR' | 'DRAFT';

export type Props = {
    owner: string;
    sendedTime: Date;
    recievedTime?: Date;
    payload?: string;
    status: ReportStatus;
    file?: File[];
};
