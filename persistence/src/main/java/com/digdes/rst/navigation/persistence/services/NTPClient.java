package com.digdes.rst.navigation.persistence.services;

import org.apache.commons.net.ntp.*;
import java.io.IOException;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class NTPClient
{

    private static final NumberFormat numberFormat = new java.text.DecimalFormat("0.00");

    public static void main(String[] args)
    {
        List<String> ntpServers = new ArrayList<>();
        if (args.length != 0) {
            ntpServers.addAll(Arrays.asList(args));
        }
        getTime(ntpServers);
    }

    public static TimeStamp getTime(List<String> ntpServers){
        if(ntpServers==null){
            ntpServers = new ArrayList<String>();
        }

        if (ntpServers.size() == 0) {
            ntpServers.add("ntp1.vniiftri.ru");
            ntpServers.add("ntp2.vniiftri.ru");
            ntpServers.add("ntp3.vniiftri.ru");
            ntpServers.add("ntp4.vniiftri.ru");
            ntpServers.add("ntp21.vniiftri.ru");
            ntpServers.add("ntp1.niiftri.irkutsk.ru");
            ntpServers.add("ntp2.niiftri.irkutsk.ru");
            ntpServers.add("vniiftri.khv.ru");
            ntpServers.add("vniiftri2.khv.ru");
        }
        NTPUDPClient client = new NTPUDPClient();
        client.setDefaultTimeout(10000);
        try {
            client.open();
            for (String arg : ntpServers)
            {
//                System.out.println();
                try {
                    InetAddress hostAddr = InetAddress.getByName(arg);
//                    System.out.println("> " + hostAddr.getHostName() + "/" + hostAddr.getHostAddress());
                    TimeInfo info = client.getTime(hostAddr);
                    TimeStamp timeStamp = processResponse(info);
                    client.close();
                    return timeStamp;
                } catch (IOException ioe) {
                    ioe.printStackTrace();
                }
            }
        } catch (SocketException e) {

        }

        client.close();
        return null;
    }

    public static TimeStamp processResponse(TimeInfo info)
    {
        NtpV3Packet message = info.getMessage();
        int stratum = message.getStratum();

        int version = message.getVersion();
        int refId = message.getReferenceId();
        String refAddr = NtpUtils.getHostAddress(refId);
        String refName = null;
        if (refId != 0) {
            if (refAddr.equals("127.127.1.0")) {
                refName = "LOCAL"; // This is the ref address for the Local Clock
            } else if (stratum >= 2) {
                // If reference id has 127.127 prefix then it uses its own reference clock
                // defined in the form 127.127.clock-type.unit-num (e.g. 127.127.8.0 mode 5
                // for GENERIC DCF77 AM; see refclock.htm from the NTP software distribution.
                if (!refAddr.startsWith("127.127")) {
                    try {
                        InetAddress addr = InetAddress.getByName(refAddr);
                        String name = addr.getHostName();
                        if (name != null && !name.equals(refAddr)) {
                            refName = name;
                        }
                    } catch (UnknownHostException e) {
                        // some stratum-2 servers sync to ref clock device but fudge stratum level higher... (e.g. 2)
                        // ref not valid host maybe it's a reference clock name?
                        // otherwise just show the ref IP address.
                        refName = NtpUtils.getReferenceClock(message);
                    }
                }
            } else if (version >= 3 && (stratum == 0 || stratum == 1)) {
                refName = NtpUtils.getReferenceClock(message);
                // refname usually have at least 3 characters (e.g. GPS, WWV, LCL, etc.)
            }
            // otherwise give up on naming the beast...
        }

        TimeStamp refNtpTime = message.getReferenceTimeStamp();

        // Originate Time is time request sent by client (t1)
        TimeStamp origNtpTime = message.getOriginateTimeStamp();

        long destTime = info.getReturnTime();
        // Receive Time is time request received by server (t2)
        TimeStamp rcvNtpTime = message.getReceiveTimeStamp();

        // Transmit time is time reply sent by server (t3)
        TimeStamp xmitNtpTime = message.getTransmitTimeStamp();

        // Destination time is time reply received by client (t4)
        TimeStamp destNtpTime = TimeStamp.getNtpTime(destTime);
//        System.out.println(" Destination Timestamp:\t" + destNtpTime + "  " + destNtpTime.toDateString());


        return destNtpTime;
    }
}
