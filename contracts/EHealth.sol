// SPDX-License-Identifier: MIT

pragma solidity >=0.7.4;
pragma abicoder v2;

// Factory contract for eDelivery
contract EHealth {
    uint nextIdDoctor;
    uint nextIdSensor;
    // Owner direction 
    address owner = 0x8FcF3B91599C6d5bb93D8c7df9f3974C622b83a4;

    // Hospitals
    mapping(address=> Hospital) public Hospitals;

    struct Hospital{
        address idHospital;
        string name;
        string city;
        string state;
        uint256 postalCode;
        bool permission;
    }

    Hospital[] public hospitalCenters;
    
    // Doctors
    mapping(address=> Doctor) public Doctors;

    struct Doctor {
        uint256 idDoctor;
        string nameDoctor;
        address hospital;
        bool permission;
    }
    // Types of doctors
    Doctor[] public doctorsHospital;

    // Sensors
    mapping(address=> Sensor) public Sensors;
    
    struct Sensor{
        uint idSensor;
        string MAC;
        string patientName;
        uint idDoctor;
        bool active;
    }
    // Types of sensors
    Sensor[] public sensorsDoctor;

    // EVENTS 
    event NewHospital(address,string,string,string,uint,bool);
    event DeleteHospital(address,string,string,string,uint,bool);
    event RefreshHospital(address,string,string,string,uint);
    event NewDoctor(uint, string, address, bool);
    event DeleteDoctor(uint, string, address, bool);
    event RefreshDoctor(uint, string, address);
    event NewSensor(uint,string,string,uint,bool);
    event DeleteSensor(uint,string,string,uint,bool);
    event RefreshSensor(uint,string,string,uint);

    // *********************************** HOSPITALS ***********************************

    // Add hospital in the system
    function AddHospital(address _idHospital, string memory _name, string memory _city, string memory _state, uint _postalCode ) public {
        hospitalCenters.push(Hospital(_idHospital, _name, _city, _state, _postalCode, true));
        emit NewHospital(_idHospital, _name, _city, _state, _postalCode, true);
    }

    function FindHospital(address _address) internal view returns(uint){
        for(uint i = 0 ; i < hospitalCenters.length ; i++){
            if(hospitalCenters[i].idHospital==_address){
                return i;
            }
        }
        revert('Hospital not found');
    }

    // Remove permission of the hospital
    function RemoveHospital(address _address) public {
        uint index = FindHospital(_address);
        hospitalCenters[index].permission=false;
        emit DeleteHospital(hospitalCenters[index].idHospital, 
        hospitalCenters[index].name, 
        hospitalCenters[index].city, 
        hospitalCenters[index].state, 
        hospitalCenters[index].postalCode, 
        hospitalCenters[index].permission);
    }

    // Update hospital data

    function UpdateHospital(address _address, string memory _name, string memory _city, string memory _state, uint _postalCode ) public {
        uint index = FindHospital(_address);
        hospitalCenters[index].name=_name;
        hospitalCenters[index].city=_city;
        hospitalCenters[index].state=_state;
        hospitalCenters[index].postalCode=_postalCode;
        emit RefreshHospital(hospitalCenters[index].idHospital, 
        hospitalCenters[index].name, 
        hospitalCenters[index].city, 
        hospitalCenters[index].state, 
        hospitalCenters[index].postalCode
        );
    }

    // All hospitals 

    function getAllHospitals() public view returns (Hospital[] memory){
        Hospital[] memory ret = new Hospital[](hospitalCenters.length);
        for (uint i = 0; i< hospitalCenters.length; i++) {
            ret[i]=hospitalCenters[i];
        }
        return ret;
    }

    // Number of hospitals

    function Length_Hospitals() public view returns (uint256){
        return hospitalCenters.length;
    }

    // Read hospital data

    function ReadHospital(address _address)public view returns(string memory, string memory, string memory, uint, bool){
        uint index = FindHospital(_address);
        return (hospitalCenters[index].name,hospitalCenters[index].city,hospitalCenters[index].state,
        hospitalCenters[index].postalCode,hospitalCenters[index].permission);
    }

    // *********************************** DOCTORS ***********************************

    // Add new health professional
    function AddDoctor(string memory _nameDoctor, address _hospital) public {
        FindHospital(_hospital);
        doctorsHospital.push(Doctor(nextIdDoctor, _nameDoctor, _hospital, true));
        emit NewDoctor(nextIdDoctor,_nameDoctor,_hospital,true);
        nextIdDoctor++;
    }
    // Find doctor 
    function FindDoctor(uint _id) internal view returns(uint){
        for(uint i = 0 ; i < doctorsHospital.length ; i++){
            if(doctorsHospital[i].idDoctor==_id){
                return i;
            }
        }
        revert('Doctor not found');
    }

    // Remove permission of the doctor
    function RemoveDoctor(uint _id) public {
        uint index = FindDoctor(_id);
        doctorsHospital[index].permission=false;
        emit DeleteDoctor(doctorsHospital[index].idDoctor,
        doctorsHospital[index].nameDoctor,
        doctorsHospital[index].hospital,
        doctorsHospital[index].permission);
    }

    // Update doctor data
    function UpdateDoctor(uint _id, string memory _nameDoctor, address _hospital ) public {
        uint index = FindDoctor(_id);
        doctorsHospital[index].nameDoctor=_nameDoctor;
        doctorsHospital[index].hospital=_hospital;
        emit RefreshDoctor(doctorsHospital[index].idDoctor,
        doctorsHospital[index].nameDoctor,
        doctorsHospital[index].hospital
        );
    }

    // Read doctor data
    function ReadDoctor(uint _id)public view returns(string memory, address, bool){
        uint index = FindDoctor(_id);
        return (doctorsHospital[index].nameDoctor,doctorsHospital[index].hospital,doctorsHospital[index].permission);
    }

    // Number of doctors
    function Length_Doctors() public view returns (uint256){
        return hospitalCenters.length;
    }

     // All Doctors 
    function getAllDoctors() public view returns (Doctor[] memory){
        Doctor[] memory ret = new Doctor[](doctorsHospital.length);
        for (uint i = 0; i< doctorsHospital.length; i++) {
            ret[i]=doctorsHospital[i];
        }
        return ret;
    }

    // All Doctors in a hospital
    function getAllDoctorsInHospital(address _address) public view returns (Doctor[] memory){
        Doctor[] memory ret = new Doctor[](doctorsHospital.length);
        for (uint i = 0; i< doctorsHospital.length; i++) {
            if(_address == doctorsHospital[i].hospital){
                ret[i]=doctorsHospital[i];
            }
        }
        return ret;
    }

    // *********************************** SENSORS ***********************************

    // Add new sensor in the system 
    function AddSensor(string memory _mac, string memory _patientName, uint _idDoctor, bool _active) public {
        FindDoctor(_idDoctor);
        sensorsDoctor.push(Sensor(nextIdSensor,_mac, _patientName, _idDoctor, _active));
        emit NewSensor(nextIdSensor,_mac, _patientName, _idDoctor, _active);
        nextIdSensor++;
    }

     // Find sensor 
    function FindSensor(uint _idSensor) internal view returns(uint){
        for(uint i = 0 ; i < sensorsDoctor.length ; i++){
            if(sensorsDoctor[i].idSensor==_idSensor){
                return i;
            }
        }
        revert('Sensor not found');
    }

    // Remove active sensor
    function RemoveSensor(uint _id) public {
        uint index = FindSensor(_id);
        sensorsDoctor[index].active=false;
        emit DeleteSensor(sensorsDoctor[index].idSensor,
        sensorsDoctor[index].MAC,
        sensorsDoctor[index].patientName,
        sensorsDoctor[index].idDoctor,
        sensorsDoctor[index].active);
    }

    // Update sensor data
    function UpdateSensor(uint _id, string memory _mac, string memory _patientName,uint _idDoctor ) public {
        uint index = FindSensor(_id);
        sensorsDoctor[index].MAC=_mac;
        sensorsDoctor[index].patientName=_patientName;
        sensorsDoctor[index].idDoctor=_idDoctor;
        emit RefreshSensor(sensorsDoctor[index].idSensor,
        sensorsDoctor[index].MAC,
        sensorsDoctor[index].patientName,
        sensorsDoctor[index].idDoctor);
    }

    // Read sensor data
    function ReadSensor(uint _id)public view returns(string memory,string memory, uint, bool){
        uint index = FindSensor(_id);
        return (sensorsDoctor[index].MAC,sensorsDoctor[index].patientName,sensorsDoctor[index].idDoctor,sensorsDoctor[index].active);
    }

    // Number of sensors
    function Length_sensors() public view returns (uint256){
        return sensorsDoctor.length;
    }

     // All Doctors 
    function getAllSensors() public view returns (Sensor[] memory){
        Sensor[] memory ret = new Sensor[](sensorsDoctor.length);
        for (uint i = 0; i< sensorsDoctor.length; i++) {
            ret[i]=sensorsDoctor[i];
        }
        return ret;
    }

    // All medical sensors for a doctor
    function getAllSensorOfDoctor (uint _idDoctor) public view returns (Sensor[] memory){
        Sensor[] memory ret = new Sensor[](sensorsDoctor.length);
        for (uint i = 0; i< sensorsDoctor.length; i++) {
            if(_idDoctor == sensorsDoctor[i].idDoctor){
                ret[i]=sensorsDoctor[i];
            }
        }
        return ret;
    }
}